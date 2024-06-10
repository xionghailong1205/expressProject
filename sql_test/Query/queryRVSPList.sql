SELECT
    rvsp.rvsp_maker,
    rvsp.rvsp_createat,
    users.user_name,
    users.user_phonenumber
FROM
    rvsp
    INNER JOIN users ON rvsp.rvsp_maker = users.user_email
WHERE
    rvsp.rvsp_of = "活动标题"