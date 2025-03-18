package com.creatisphere.Backend_Payments_Springboot.domain.repository_portOut.payments;

import com.creatisphere.Backend_Payments_Springboot.application.dto.payments.PaymentRequest;

import reactor.core.publisher.Mono;
import java.util.Map;

public interface PaymentPortOut {

    Mono<Map<String, Object>> processPayment(PaymentRequest paymentRequest);

    Mono<Map<String, Object>> capturePayment(String orderId);

}
