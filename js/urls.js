"use strict";

const HOST = 'http://map.zxsmart.cn:8080';
const API_URL = '/api';

function api_url (path) {
    return HOST + API_URL + path
}

function common_url (path) {
    return HOST + path
}

module.exports = {
    api: {
        auth_url: common_url('/auth/v1.0/login'),
        register: api_url('/register/v1.0'),
        register_status: api_url('/register/v1.0/status'),
        register_info: api_url('/register/v1.0/info'),
        command: api_url('/commands/v1.0/'),
        command_page: api_url('/commands/v1.0/page'),
        log: api_url('/logs/v1.0/'),
        log_page: api_url('/logs/v1.0/page'),
        tracker: api_url('/trackers/v1.0/'),
        tracker_page: api_url('/trackers/v1.0/page'),
        tracker_detail: api_url('/trackers/v1.0/detail/'),
        tracker_page_choose:api_url('/trackers/v1.0/page/chooseable'),
        alarm: api_url('/alarms/v1.0/'),
        alarm_page: api_url('/alarms/v1.0/page'),
        alarm_solve: api_url('/alarms/v1.0/solve/'),
        vehicle: api_url('/vehicles/v1.0'),
        vehicle_markerList: api_url('/vehicles/v1.0/markerList'),
        vehicle_page: api_url('/vehicles/v1.0/page'),
        vehicle_statistics: api_url('/vehicles/v1.0/statistics'),
        vehicle_detail: api_url('/vehicles/v1.0/detail/'),
        org_url: api_url('/org/v1.0'),
        customer:api_url('/customers/v1.0'),
        customer_page:api_url('/customers/v1.0/page'),
        customer_detail:api_url('/customers/v1.0/detail'),
        vehicles:api_url('/vehicles/v1.0/'),
        vehicles_page:api_url('/vehicles/v1.0/page/all'),
        vehicles_page_all:api_url('/vehicles/v1.0/page/all'),
        alarm_num:api_url('/alarms/v1.0/num'),
        vehicle_change_org_url: api_url('/vehicles/v1.0/change/org'),
        tasks:api_url('/tasks/v1.0/'),
        tasks_page:api_url('/tasks/v1.0/page'),
        vehicle_page_choose:api_url('/vehicles/v1.0/page/chooseable'),
        users:api_url('/users/v1.0/'),
        users_page:api_url('/users/v1.0/page'),
        user_info:api_url('/users/v1.0/me'),
        user_change_pwd:api_url('/users/v1.0/me/password'),
        user_reset_password:api_url('/users/v1.0/password/'),
        customer_num:api_url('/customers/v1.0/num'),
        vehicle_num:api_url('/vehicles/v1.0/num'),
        tracker_num:api_url('/trackers/v1.0/num'),
        increase_device:api_url('/trackers/v1.0/increase'),
        alarm_week_data:api_url('/alarms/v1.0/week'),
        vehicle_total_debt:api_url('/vehicles/v1.0/total/debt'),
        vehicle_distribute:api_url('/vehicles/v1.0/distribute'),
        customer_export:api_url('/customers/v1.0/export'),
        vehicle_export:api_url('/vehicles/v1.0/export'),
        tracker_export: api_url('/trackers/v1.0/export'),
        command_export:api_url('/commands/v1.0/export'),
        user_export:api_url('/users/v1.0/export'),
        log_export:api_url('/logs/v1.0/export'),
        alarm_export:api_url('/alarms/v1.0/export'),
        frequent_locations: api_url('/map/track/frequent_locations')
    }
}