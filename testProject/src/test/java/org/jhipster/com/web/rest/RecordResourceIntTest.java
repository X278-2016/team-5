package org.jhipster.com.web.rest;

import org.jhipster.com.TestProjectApp;

import org.jhipster.com.domain.Record;
import org.jhipster.com.repository.RecordRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RecordResource REST controller.
 *
 * @see RecordResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestProjectApp.class)
public class RecordResourceIntTest {

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").withZone(ZoneId.of("Z"));

    private static final String DEFAULT_USER = "AAAAA";
    private static final String UPDATED_USER = "BBBBB";

    private static final Integer DEFAULT_GLUCOSE_LEVEL = 1;
    private static final Integer UPDATED_GLUCOSE_LEVEL = 2;
    private static final String DEFAULT_MOOD = "AAAAA";
    private static final String UPDATED_MOOD = "BBBBB";

    private static final ZonedDateTime DEFAULT_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneId.systemDefault());
    private static final ZonedDateTime UPDATED_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final String DEFAULT_DATE_TIME_STR = dateTimeFormatter.format(DEFAULT_DATE_TIME);

    @Inject
    private RecordRepository recordRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restRecordMockMvc;

    private Record record;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        RecordResource recordResource = new RecordResource();
        ReflectionTestUtils.setField(recordResource, "recordRepository", recordRepository);
        this.restRecordMockMvc = MockMvcBuilders.standaloneSetup(recordResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Record createEntity(EntityManager em) {
        Record record = new Record()
                .user(DEFAULT_USER)
                .glucoseLevel(DEFAULT_GLUCOSE_LEVEL)
                .mood(DEFAULT_MOOD)
                .dateTime(DEFAULT_DATE_TIME);
        return record;
    }

    @Before
    public void initTest() {
        record = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecord() throws Exception {
        int databaseSizeBeforeCreate = recordRepository.findAll().size();

        // Create the Record

        restRecordMockMvc.perform(post("/api/records")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(record)))
                .andExpect(status().isCreated());

        // Validate the Record in the database
        List<Record> records = recordRepository.findAll();
        assertThat(records).hasSize(databaseSizeBeforeCreate + 1);
        Record testRecord = records.get(records.size() - 1);
        assertThat(testRecord.getUser()).isEqualTo(DEFAULT_USER);
        assertThat(testRecord.getGlucoseLevel()).isEqualTo(DEFAULT_GLUCOSE_LEVEL);
        assertThat(testRecord.getMood()).isEqualTo(DEFAULT_MOOD);
        assertThat(testRecord.getDateTime()).isEqualTo(DEFAULT_DATE_TIME);
    }

    @Test
    @Transactional
    public void checkUserIsRequired() throws Exception {
        int databaseSizeBeforeTest = recordRepository.findAll().size();
        // set the field null
        record.setUser(null);

        // Create the Record, which fails.

        restRecordMockMvc.perform(post("/api/records")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(record)))
                .andExpect(status().isBadRequest());

        List<Record> records = recordRepository.findAll();
        assertThat(records).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGlucoseLevelIsRequired() throws Exception {
        int databaseSizeBeforeTest = recordRepository.findAll().size();
        // set the field null
        record.setGlucoseLevel(null);

        // Create the Record, which fails.

        restRecordMockMvc.perform(post("/api/records")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(record)))
                .andExpect(status().isBadRequest());

        List<Record> records = recordRepository.findAll();
        assertThat(records).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = recordRepository.findAll().size();
        // set the field null
        record.setDateTime(null);

        // Create the Record, which fails.

        restRecordMockMvc.perform(post("/api/records")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(record)))
                .andExpect(status().isBadRequest());

        List<Record> records = recordRepository.findAll();
        assertThat(records).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRecords() throws Exception {
        // Initialize the database
        recordRepository.saveAndFlush(record);

        // Get all the records
        restRecordMockMvc.perform(get("/api/records?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(record.getId().intValue())))
                .andExpect(jsonPath("$.[*].user").value(hasItem(DEFAULT_USER.toString())))
                .andExpect(jsonPath("$.[*].glucoseLevel").value(hasItem(DEFAULT_GLUCOSE_LEVEL)))
                .andExpect(jsonPath("$.[*].mood").value(hasItem(DEFAULT_MOOD.toString())))
                .andExpect(jsonPath("$.[*].dateTime").value(hasItem(DEFAULT_DATE_TIME_STR)));
    }

    @Test
    @Transactional
    public void getRecord() throws Exception {
        // Initialize the database
        recordRepository.saveAndFlush(record);

        // Get the record
        restRecordMockMvc.perform(get("/api/records/{id}", record.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(record.getId().intValue()))
            .andExpect(jsonPath("$.user").value(DEFAULT_USER.toString()))
            .andExpect(jsonPath("$.glucoseLevel").value(DEFAULT_GLUCOSE_LEVEL))
            .andExpect(jsonPath("$.mood").value(DEFAULT_MOOD.toString()))
            .andExpect(jsonPath("$.dateTime").value(DEFAULT_DATE_TIME_STR));
    }

    @Test
    @Transactional
    public void getNonExistingRecord() throws Exception {
        // Get the record
        restRecordMockMvc.perform(get("/api/records/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecord() throws Exception {
        // Initialize the database
        recordRepository.saveAndFlush(record);
        int databaseSizeBeforeUpdate = recordRepository.findAll().size();

        // Update the record
        Record updatedRecord = recordRepository.findOne(record.getId());
        updatedRecord
                .user(UPDATED_USER)
                .glucoseLevel(UPDATED_GLUCOSE_LEVEL)
                .mood(UPDATED_MOOD)
                .dateTime(UPDATED_DATE_TIME);

        restRecordMockMvc.perform(put("/api/records")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedRecord)))
                .andExpect(status().isOk());

        // Validate the Record in the database
        List<Record> records = recordRepository.findAll();
        assertThat(records).hasSize(databaseSizeBeforeUpdate);
        Record testRecord = records.get(records.size() - 1);
        assertThat(testRecord.getUser()).isEqualTo(UPDATED_USER);
        assertThat(testRecord.getGlucoseLevel()).isEqualTo(UPDATED_GLUCOSE_LEVEL);
        assertThat(testRecord.getMood()).isEqualTo(UPDATED_MOOD);
        assertThat(testRecord.getDateTime()).isEqualTo(UPDATED_DATE_TIME);
    }

    @Test
    @Transactional
    public void deleteRecord() throws Exception {
        // Initialize the database
        recordRepository.saveAndFlush(record);
        int databaseSizeBeforeDelete = recordRepository.findAll().size();

        // Get the record
        restRecordMockMvc.perform(delete("/api/records/{id}", record.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Record> records = recordRepository.findAll();
        assertThat(records).hasSize(databaseSizeBeforeDelete - 1);
    }
}
