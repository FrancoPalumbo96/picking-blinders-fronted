package com.picking.blinders.app.repositories;

import com.picking.blinders.app.models.State;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StateRepository extends CrudRepository<State, Long> {

    State findByName(String name);
}
