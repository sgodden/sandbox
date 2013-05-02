package org.sgodden.test.integration

import com.mongodb.casbah.MongoConnection

object IntegrationTestHelper {

  def DB_NAME = "orderManagement-integration"

  def dropDB {
    val conn = MongoConnection()
    conn.dropDatabase(DB_NAME)
    conn.close()
  }

}
