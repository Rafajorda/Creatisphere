package com.gvm_art.Backend_Payments_Springboot.application.serviceImpl.payments;

import com.gvm_art.Backend_Payments_Springboot.application.service_portIn.payments.PaymentService;
import com.gvm_art.Backend_Payments_Springboot.domain.repository_portOut.payments.PaymentPortOut;
import com.gvm_art.Backend_Payments_Springboot.application.dto.payments.PaymentRequest;
import com.gvm_art.Backend_Payments_Springboot.application.exception.payments.PaymentMethodNotFoundException;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    
    private final Map<String, PaymentPortOut> paymentProcessors;

    @Override
    public Mono<Map<String, Object>> initiatePayment(PaymentRequest paymentRequest) {
        PaymentPortOut processor = paymentProcessors.get(paymentRequest.getPaymentMethod().toLowerCase());
        if (processor == null) {
            return Mono.error(new PaymentMethodNotFoundException());
        }
        return processor.processPayment(paymentRequest);
    }

    @Override
    public Mono<Map<String, Object>> capturePayment(String orderId) {
        return paymentProcessors.get("paypal").capturePayment(orderId);
    }
}
