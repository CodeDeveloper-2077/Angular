package com.example.backend.repository;

import com.example.backend.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(path = "people")
@CrossOrigin(origins = "http://localhost:4200")
public interface PersonRepository extends JpaRepository<Person, Long> {

    List<Person> findByAddress_City(@Param("city") String city);

    List<Person> findByFamilyName(@Param("familyName") String familyName);
}
