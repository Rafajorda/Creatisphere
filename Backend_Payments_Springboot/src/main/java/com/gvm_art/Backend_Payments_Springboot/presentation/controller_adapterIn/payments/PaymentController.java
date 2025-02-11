package com.gvm_art.Backend_Payments_Springboot.presentation.controller_adapterIn.payments;

import com.gvm_art.Backend_Payments_Springboot.application.dto.payments.PayPalCaptureResponse;
import com.gvm_art.Backend_Payments_Springboot.application.dto.payments.PaymentProcessResponse;
import com.gvm_art.Backend_Payments_Springboot.application.dto.payments.PaymentRequest;
import com.gvm_art.Backend_Payments_Springboot.application.service_portIn.payments.PaymentService;
import com.gvm_art.Backend_Payments_Springboot.presentation.assembler.payments.PaymentAssembler;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {
    
    private final PaymentService paymentService;
    private final PaymentAssembler assembler;

    @PostMapping("/process")
    public Mono<PaymentProcessResponse> processPayment(@RequestBody PaymentRequest request) {
        return paymentService.initiatePayment(request)
            .map(assembler::toProcessResponse);
    }

    @PostMapping("/capture/{orderId}")
    public Mono<PayPalCaptureResponse> capturePayment(@PathVariable String orderId) {
        return paymentService.capturePayment(orderId)
            .map(assembler::toCaptureResponse);
    }

}
