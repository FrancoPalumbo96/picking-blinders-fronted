package com.picking.blinders.app.repositories;

import com.picking.blinders.app.models.Station;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StationRepository extends CrudRepository<Station, Long> {
}
