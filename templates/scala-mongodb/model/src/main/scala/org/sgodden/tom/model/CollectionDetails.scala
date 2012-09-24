package org.sgodden.tom.model

class CollectionDetails extends ICollectionDetails {

  private var address: Address = null

  def getAddress = address
  def setAddress(address: IAddress) {
    this.address = address.asInstanceOf[Address]
  }

}
