package org.sgodden;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("/myservice")
@Produces("application/json")
public class MyService {

    @GET
    public String getStuff() {
        return "{ 'foo': 'bar' }";
    }

}
