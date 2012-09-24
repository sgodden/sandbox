package org.sgodden.tom.model

import org.springframework.stereotype.Component

@Component
class CustomerOrderConfirmCommand {

  private[model] def execute(order: CustomerOrder) {
    order.setStatus(CustomerOrderStatus.CONFIRMED)
  }

}
