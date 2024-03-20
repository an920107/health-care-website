class Config:
    ALLOW_IMAGE_ENDSWITH = ['.png', '.jpg', '.jpeg']
    ALLOW_FILE_ENDSWITH = ['.doc', '.docx', '.ppt', '.pptx', '.pdf', '.xls', '.xlsx', '.csv', '.odt']
    PAGE_SIZE = 10

    POST_COLUMN = ['activity', 'health', 'restaurant', 'nutrition']
    STATIC_POST_COLUMN = [
        # about us
        'workTeam', 'serviceHours', 'trafficMap',

        # health care
        'freshmanHealthCheck', 'newEmployeePhysicalExam', 'regularHealthCheck',

        # emergency response
        'emergencyHotline', 'campusInjuryTreatment', 'campusAED',

        # health service
        'studentGroupInsurance', 'medicalEquipmentLoan', 'healthManagementFacilities',

        # health promotion
        'onSiteOccupationalHealthService', 'workplaceHealthServicePlan',

        # health education
        'freshmanCPR', 'campusTobaccoControlEducation', 'campusAIDSPreventionEducation',
        'campusInfectiousDiseasePrevention',
    ]

    STATIC_POST_CONFIG = {
        'ATTACHMENT_DIR': './statics/static_pages/attachments',
        'IMAGE_DIR': './statics/static_pages/images',
    }

    RESTAURANT_CONFIG = {
        'ATTACHMENT_DIR': './statics/restaurant/attachments',
    }

    POST_CONFIG = {
        'ATTACHMENT_DIR': './statics/post/attachments',
        'IMAGE_DIR': './statics/post/images',
    }

    CAROUSEL_CONFIG = {
        'ATTACHMENT_DIR': './statics/post/attachments',
        'IMAGE_DIR': './statics/post/images',
    }