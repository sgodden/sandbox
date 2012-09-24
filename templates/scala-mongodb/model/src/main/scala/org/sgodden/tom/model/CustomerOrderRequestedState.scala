package org.sgodden.tom.model

import org.springframework.stereotype.Component
import org.springframework.beans.factory.annotation.Autowired

@Component
class CustomerOrderRequestedState extends AbstractCustomerOrderState {

  @Autowired
  private var confirmCommand: CustomerOrderConfirmCommand = null

  def confirm(order: CustomerOrder) {
    confirmCommand execute order
  }

  def ship(order: CustomerOrder) {
    throw new IllegalStateException("An order may not be shipped from the requested state")
  }

  def cancel(order: CustomerOrder) {
    order setStatus CustomerOrderStatus.CANCELLED
  }

  override def save(order: CustomerOrder) {
    order setStatus CustomerOrderStatus.REQUESTED
  }

  def willEnter(order: CustomerOrder) = true

  def willLeave(order: CustomerOrder) = true
}
