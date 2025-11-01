package exemple.service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;

import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Timestamp;

import exemple.person.*;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;

@Path("/person")
public class PersonService {

    @GET
    @Produces("Application/x-protobuf")
    public byte[] getPerson() {
        LocalDate birthLocalDate = LocalDate.of(1989, 3, 15);
        Instant birthInstant = birthLocalDate.atStartOfDay().toInstant(ZoneOffset.UTC);

        Timestamp birthTimestamp = Timestamp.newBuilder()
                .setSeconds(birthInstant.getEpochSecond())
                .setNanos(0)
                .build();

        // Création d'une instance Person (issue de protobuf)
        return Person.newBuilder()
                .setId("12345")
                .setName("Alice Dupont")
                .setAge(35)
                .setGender(Gender.FEMALE)
                .setBirthDate(birthTimestamp)
                .addEmails("alice@example.com")
                .build()
                .toByteArray();
    }

    @POST
    @Consumes("Application/x-protobuf")
    public void postPerson(byte[] data) {
        try {
            Person person = Person.parseFrom(data);
            System.out.println(person.toString());
        } catch (InvalidProtocolBufferException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
