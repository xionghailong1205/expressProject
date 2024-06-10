SELECT
    events.event_title,
    events.event_content,
    events.event_content,
    events.update_at,
    events.open_time,
    events.close_time,
    managers.manager_name
FROM
    events
    INNER JOIN managers ON events.createby = managers.manager_email
WHERE
    managers.managerof = 3