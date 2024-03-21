class Config:
    ALLOW_IMAGE_ENDSWITH = ['.png', '.jpg', '.jpeg']
    ALLOW_FILE_ENDSWITH = ['.doc', '.docx', '.ppt', '.pptx', '.pdf', '.xls', '.xlsx', '.csv', '.odt']
    PAGE_SIZE = 10

    POST_COLUMN = ['activity', 'health', 'restaurant_post', 'nutrition']
    STATIC_POST_COLUMN = [
        # about us
        'work_team', 'service_hours', 'traffic_map',

        # health care
        'freshman_health_check', 'new_employee_physical_exam', 'regular_health_check',

        # emergency response
        'emergency_hotline', 'campus_injury_treatment', 'campus_aed',

        # health service
        'student_group_insurance', 'medical_equipmentLoan', 'health_management_facilities',

        # health promotion
        'on_site_occupational_health_service', 'workplace_health_service_plan',

        # health education
        'freshman_cpr', 'campus_tobacco_control_education', 'campus_aids_prevention_education',
        'campus_infectious_disease_prevention',
    ]

    STATIC_POST_CONFIG = {
        'ATTACHMENT_DIR': './statics/static_post/attachments',
        'IMAGE_DIR': './statics/static_post/images',
    }

    RESTAURANT_CONFIG = {
        'ATTACHMENT_DIR': './statics/restaurant_post/attachments',
    }

    POST_CONFIG = {
        'ATTACHMENT_DIR': './statics/post/attachments',
        'IMAGE_DIR': './statics/post/images',
    }

    CAROUSEL_CONFIG = {
        'IMAGE_DIR': './statics/carousel/images',
    }
