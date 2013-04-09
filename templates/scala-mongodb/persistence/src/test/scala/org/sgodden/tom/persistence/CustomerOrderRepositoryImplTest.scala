package org.sgodden.tom.persistence

import org.springframework.test.context.testng.AbstractTestNGSpringContextTests
import org.springframework.test.context.ContextConfiguration
import org.springframework.beans.factory.annotation.Autowired
import org.testng.annotations.Test
import org.slf4j.LoggerFactory

@ContextConfiguration(locations = Array("classpath:org/sgodden/tom/persistence/beans.xml"))
class CustomerOrderRepositoryImplTest extends AbstractTestNGSpringContextTests {

  private def LOG = LoggerFactory.getLogger(classOf[CustomerOrderRepositoryImplTest])

  @Autowired
  val repo: CustomerOrderRepositoryImpl = null

  @Test
  def somTest = {
    LOG.info("ASDASD")
  }



}
