package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.Animal;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Animal entity.
 */
public interface AnimalSearchRepository extends ElasticsearchRepository<Animal, Long> {
}
