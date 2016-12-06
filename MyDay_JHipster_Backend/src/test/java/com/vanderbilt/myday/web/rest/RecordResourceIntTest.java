package com.vanderbilt.myday.web.rest;

import com.vanderbilt.myday.MyDayApp;

import com.vanderbilt.myday.domain.Record;
import com.vanderbilt.myday.repository.RecordRepository;
import com.vanderbilt.myday.service.RecordService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.vanderbilt.myday.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RecordResource REST controller.
 *
 * @see RecordResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyDayApp.class)
public class RecordResourceIntTest {

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final Double DEFAULT_GLUCOSE_LEVEL = 1D;
    private static final Double UPDATED_GLUCOSE_LEVEL = 2D;

    private static final String DEFAULT_MOOD = "AAAAAAAAAA";
    private static final String UPDATED_MOOD = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    @Inject
    private RecordRepository recordRepository;

    @Inject
    private RecordService recordService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restRecordMockMvc;

    private Record record;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        RecordResource recordResource = new RecordResource();
        ReflectionTestUtils.setField(recordResource, "recordService", recordService);
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
                .username(DEFAULT_USERNAME)
                .glucoseLevel(DEFAULT_GLUCOSE_LEVEL)
                .mood(DEFAULT_MOOD)
                .date(DEFAULT_DATE)
                .location(DEFAULT_LOCATION);
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
        assertThat(testRecord.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testRecord.getGlucoseLevel()).isEqualTo(DEFAULT_GLUCOSE_LEVEL);
        assertThat(testRecord.getMood()).isEqualTo(DEFAULT_MOOD);
        assertThat(testRecord.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testRecord.getLocation()).isEqualTo(DEFAULT_LOCATION);
    }

    @Test
    @Transactional
    public void checkUsernameIsRequired() throws Exception {
        int databaseSizeBeforeTest = recordRepository.findAll().size();
        // set the field null
        record.setUsername(null);

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
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = recordRepository.findAll().size();
        // set the field null
        record.setDate(null);

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
    public void checkLocationIsRequired() throws Exception {
        int databaseSizeBeforeTest = recordRepository.findAll().size();
        // set the field null
        record.setLocation(null);

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
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME.toString())))
            .andExpect(jsonPath("$.[*].glucoseLevel").value(hasItem(DEFAULT_GLUCOSE_LEVEL.doubleValue())))
            .andExpect(jsonPath("$.[*].mood").value(hasItem(DEFAULT_MOOD.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())));
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
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME.toString()))
            .andExpect(jsonPath("$.glucoseLevel").value(DEFAULT_GLUCOSE_LEVEL.doubleValue()))
            .andExpect(jsonPath("$.mood").value(DEFAULT_MOOD.toString()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()));
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
        recordService.save(record);

        int databaseSizeBeforeUpdate = recordRepository.findAll().size();

        // Update the record
        Record updatedRecord = recordRepository.findOne(record.getId());
        updatedRecord
                .username(UPDATED_USERNAME)
                .glucoseLevel(UPDATED_GLUCOSE_LEVEL)
                .mood(UPDATED_MOOD)
                .date(UPDATED_DATE)
                .location(UPDATED_LOCATION);

        restRecordMockMvc.perform(put("/api/records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRecord)))
            .andExpect(status().isOk());

        // Validate the Record in the database
        List<Record> records = recordRepository.findAll();
        assertThat(records).hasSize(databaseSizeBeforeUpdate);
        Record testRecord = records.get(records.size() - 1);
        assertThat(testRecord.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testRecord.getGlucoseLevel()).isEqualTo(UPDATED_GLUCOSE_LEVEL);
        assertThat(testRecord.getMood()).isEqualTo(UPDATED_MOOD);
        assertThat(testRecord.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testRecord.getLocation()).isEqualTo(UPDATED_LOCATION);
    }

    @Test
    @Transactional
    public void deleteRecord() throws Exception {
        // Initialize the database
        recordService.save(record);

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
