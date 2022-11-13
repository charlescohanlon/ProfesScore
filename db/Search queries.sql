use professcore;
-- search by professor query
SELECT professor_id, first_name, last_name, ratio, rating, score FROM grade_distributions
	LEFT JOIN basic_metrics ON basic_metrics.professor_id = grade_distributions.professor_id
    LEFT JOIN quality_ratings ON quality_ratings.quality_rating_id = basic_metrics.quality_rating_id
    WHERE CONCAT(first_name, " ", last_name) LIKE "%JANE%%DOE%";
    
-- get taught courses query
SELECT abbreviation, class_number FROM professor_courses
	JOIN courses ON courses.course_id = professor_courses.course_id
    JOIN subjects ON subjects.subject_id = courses.subject_id
    WHERE professor_courses.professor_id = "123";