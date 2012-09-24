package org.sgodden.tom.model

abstract class AbstractCustomerOrderState extends CustomerOrderState {

  def save(order: CustomerOrder)

}
