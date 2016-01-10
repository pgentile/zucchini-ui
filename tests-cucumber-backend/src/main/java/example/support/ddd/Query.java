package example.support.ddd;

import java.util.List;
import java.util.Optional;

public interface Query<T> {

    List<T> find();

    T findOne();

    Optional<T> tryToFindOne();

}
