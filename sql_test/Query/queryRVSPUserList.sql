SELECT
    events.event_title
FROM
    rvsp
    INNER JOIN events ON rvsp.rvsp_of = events.event_id
WHERE
    rvsp.rvsp_maker = "xionghailongk@icloud.com"