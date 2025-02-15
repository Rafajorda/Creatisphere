package com.gvm_art.Backend_Payments_Springboot.domain.exceptionImpl;

import com.gvm_art.Backend_Payments_Springboot.application.exception.BusinessException;
import com.gvm_art.Backend_Payments_Springboot.application.exception.ResourceNotFoundException;
import com.gvm_art.Backend_Payments_Springboot.application.exception.payments.PaymentMethodNotFoundException;
import com.gvm_art.Backend_Payments_Springboot.application.exception.payments.PaymentProcessingException;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import java.util.*;

@Slf4j
@RestControllerAdvice
@Tag(name = "Exceptions", description = "Payment processing error handling")
public class ExceptionHandlerController extends ResponseEntityExceptionHandler {
    private static final String GENERIC_ERROR_MESSAGE = "Something went wrong with the payment process.";

    private Error.ErrorBuilder createErrorBuilder(Map<String, Object> errors) {
        return Error.builder().errors(errors);
    }

    private Error.ErrorBuilder createErrorBuilder(String message) {
        return Error.builder()
                .status("error")
                .message(message);
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers,
            HttpStatusCode statusCode, WebRequest request) {
        if (body == null || body instanceof String) {
            body = createErrorBuilder(GENERIC_ERROR_MESSAGE)
                    .build();
        }

        return super.handleExceptionInternal(ex, body, headers, statusCode, request);
    }

    private ResponseEntity<?> handleResourceNotFound(ResourceNotFoundException ex, WebRequest request, String name) {
        var status = HttpStatus.NOT_FOUND;
        var error = createErrorBuilder(toMap(name, ex.getMessage())).build();

        return handleExceptionInternal(ex, error, new HttpHeaders(), status, request);
    }

    @ExceptionHandler(PaymentMethodNotFoundException.class)
    @Operation(summary = "Payment method not found or not supported")
    @ApiResponses({
        @ApiResponse(responseCode = "404", description = "Payment method not found or not supported",
            content = @Content(schema = @Schema(implementation = Error.class)))
    })
    public ResponseEntity<?> handlePaymentMethodNotFound(PaymentMethodNotFoundException ex, WebRequest request) {
        return handleResourceNotFound(ex, request, "paymentMethod");
    }

    @ExceptionHandler(PaymentProcessingException.class)
    @Operation(summary = "Payment processing error")
    @ApiResponses({
        @ApiResponse(responseCode = "500", description = "Payment processing error: {specific error message}",
            content = @Content(schema = @Schema(implementation = Error.class)))
    })
    public ResponseEntity<?> handlePaymentProcessing(PaymentProcessingException ex, WebRequest request) {
        var status = HttpStatus.INTERNAL_SERVER_ERROR;
        var error = createErrorBuilder(ex.getMessage()).build();
        return handleExceptionInternal(ex, error, new HttpHeaders(), status, request);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleUnexpectedError(Exception ex, WebRequest request) {
        log.error("Unexpected error occurred: ", ex);
        var status = HttpStatus.INTERNAL_SERVER_ERROR;
        var error = createErrorBuilder(GENERIC_ERROR_MESSAGE).build();
        return handleExceptionInternal(ex, error, new HttpHeaders(), status, request);
    }

    @ExceptionHandler(BusinessException.class)
    @Operation(summary = "General payment operation error")
    @ApiResponses({
        @ApiResponse(responseCode = "500", description = "Operation error: {specific error message}",
            content = @Content(schema = @Schema(implementation = Error.class)))
    })
    public ResponseEntity<?> handleBusiness(BusinessException ex, WebRequest request) {
        var status = HttpStatus.INTERNAL_SERVER_ERROR;

        var error = createErrorBuilder(ex.getMessage()).build();

        return handleExceptionInternal(ex, error, new HttpHeaders(), status, request);
    }

    private List<String> toList(String message) {
        var messageList = new ArrayList<String>();
        messageList.add(message);
        return messageList;
    }

    private Map<String, Object> toMap(String field, String message) {
        var map = new HashMap<String, Object>();
        map.put(field, toList(message));
        return map;
    }
}
