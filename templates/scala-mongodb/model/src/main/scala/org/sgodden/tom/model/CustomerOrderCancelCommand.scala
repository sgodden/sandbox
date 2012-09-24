package org.sgodden.tom.model

class CustomerOrderCancelCommand {

  def cancel(order: CustomerOrder) {
    order.setStatus(CustomerOrderStatus.CANCELLED)
  }

}
