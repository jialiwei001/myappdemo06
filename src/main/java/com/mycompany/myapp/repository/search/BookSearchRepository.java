package com.mycompany.myapp.repository.search;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.awt.print.Book;

/**
 * Spring Data Elasticsearch repository for the Book entity.
 */
public interface BookSearchRepository extends ElasticsearchRepository<Book, Long> {
}
