package com.picking.blinders.app.repositories;

import com.picking.blinders.app.models.PickingListProductQuantity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PickingListProductQuantityRepository extends CrudRepository<PickingListProductQuantity, Long> {
    //List<PickingListProductQuantity> findByPickingList(Long pickingList);
    //List<PickingListProductQuantity> getByPickingList_Id(Long pickingList);
    List<PickingListProductQuantity> findByPickingList_Id(Long pickingList);

}
