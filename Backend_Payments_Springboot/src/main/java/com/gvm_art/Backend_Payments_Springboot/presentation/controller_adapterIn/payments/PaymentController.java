package com.gvm_art.Backend_Payments_Springboot.presentation.controller_adapterIn.payments;

import com.gvm_art.Backend_Payments_Springboot.application.dto.payments.PayPalCaptureResponse;
import com.gvm_art.Backend_Payments_Springboot.application.dto.payments.PaymentProcessResponse;
import com.gvm_art.Backend_Payments_Springboot.application.dto.payments.PaymentRequest;
import com.gvm_art.Backend_Payments_Springboot.application.service_portIn.payments.PaymentService;
import com.gvm_art.Backend_Payments_Springboot.presentation.assembler.payments.PaymentAssembler;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@Tag(name = "Payment Operations", description = "Payment processing endpoints")
public class PaymentController {
    
    private final PaymentService paymentService;
    private final PaymentAssembler assembler;

    @Operation(summary = "Process a new payment", 
              description = "Initiates a payment process with Stripe or PayPal")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Payment processed successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid payment request"),
        @ApiResponse(responseCode = "404", description = "Payment method not found"),
        @ApiResponse(responseCode = "500", description = "Payment processing error")
    })
    @PostMapping("/process")
    public Mono<PaymentProcessResponse> processPayment(@RequestBody PaymentRequest request) {
        return paymentService.initiatePayment(request)
            .map(assembler::toProcessResponse);
    }

    @Operation(summary = "Capture a payment", 
        description = "Captures a previously authorized PayPal payment")
    @ApiResponses({
    @ApiResponse(responseCode = "200", description = "Payment captured successfully"),
    @ApiResponse(responseCode = "404", description = "Order not found"),
    @ApiResponse(responseCode = "500", description = "Payment capture error")
    })
    @PostMapping("/capture/{orderId}")
    public Mono<PayPalCaptureResponse> capturePayment( @Parameter(description = "PayPal order ID to capture", example = "5O6P7Q8R9S0T")
    @PathVariable String orderId) {
        return paymentService.capturePayment(orderId)
            .map(assembler::toCaptureResponse);
    }

}
