select
    updates.*,
    managers.manager_name
from
    updates
    inner join managers on updates.createby = managers.manager_email
where
    managers.managerof = 3