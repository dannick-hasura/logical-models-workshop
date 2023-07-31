SELECT
    CONCAT(p.first_name, ' ', LEFT(p.last_name, 1)) AS patient_name,
    p.gender AS patient_gender,
    p.id AS patient_id,
    EXTRACT(YEAR FROM p.date_of_birth) AS patient_birth_year,
    SUBSTRING(p.address, '^[0-9]+') AS street_number,
    CONCAT('**** **** **** ', RIGHT(p.contact_number, 4)) AS masked_contact_number,
    a.appointment_date AS most_recent_appointment
FROM
    patients p
LEFT JOIN (
    SELECT
        patient_id,
        MAX(appointment_date) AS appointment_date
    FROM
        appts
    GROUP BY
        patient_id
) a ON p.id = a.patient_id
WHERE
    p.first_name ILIKE '%' || {{search_text}} || '%'
    OR p.last_name ILIKE '%' || {{search_text}} || '%'
    OR p.address ILIKE '%' || {{search_text}} || '%'
    OR p.contact_number LIKE '%' || {{search_text}} || '%';
