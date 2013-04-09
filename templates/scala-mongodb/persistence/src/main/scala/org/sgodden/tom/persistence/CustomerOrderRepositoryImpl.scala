package org.sgodden.tom.persistence

import com.novus.salat._
import com.novus.salat.global._
import com.mongodb.casbah.Imports._
import com.mongodb.casbah.commons.conversions.scala._
import model.CustomerOrderP
import org.sgodden.tom.model.{CustomerOrder, ICustomerOrder, CustomerOrderRepository}
import com.mongodb.casbah.MongoConnection
import com.mongodb.casbah.commons.MongoDBObject
import org.bson.types.ObjectId

class CustomerOrderRepositoryImpl(databaseName: String) extends CustomerOrderRepository {
  val conn = MongoConnection()
  val db = conn(databaseName)
  val coll = db("customerOrders")

  println("ENV: " + System.getProperty("env"))

  RegisterConversionHelpers()
  RegisterJodaTimeConversionHelpers()

  def remove(order: ICustomerOrder) {
    order.asInstanceOf[CustomerOrder].approveRemove(() => {
      coll.remove(MongoDBObject("_id" -> new ObjectId(order.getId)))
    })
  }

  def findAll = {
    coll.map(dbo => {
      grater[CustomerOrderP].asObject(dbo).asObject
    }).toList
  }

  def persist(order: ICustomerOrder) {
    order.asInstanceOf[CustomerOrder].approvePersist(() => {
      coll.save(grater[CustomerOrderP].asDBObject(CustomerOrderP(order)))
      order.asInstanceOf[CustomerOrder].setId(coll.last.get("_id").toString)
    })
  }

  def merge(order: ICustomerOrder) {
    order.asInstanceOf[CustomerOrder].approvePersist(() => {
      coll.save(grater[CustomerOrderP].asDBObject(CustomerOrderP(order)))
    })
  }

  def findById(id: String) =
    grater[CustomerOrderP].asObject(coll.findOne(MongoDBObject("_id" -> new ObjectId(id))).get).asObject

  def count = {
    coll.size
  }

}
