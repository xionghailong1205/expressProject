SELECT
    updates.update_content,
    updates.update_accessibility,
    updates.create_at,
    managers.manager_name
FROM
    updates
    INNER JOIN managers ON updates.createby = managers.manager_email
WHERE
    managers.managerof = 3