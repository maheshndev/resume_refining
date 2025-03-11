app_name = "resume_refining"
app_title = "Resume Refining"
app_publisher = "AT"
app_description = "to filter resume with skills & experiance"
app_email = "write-us@assimilatetechnologies.com"
app_license = "mit"

# Apps
# ------------------

# required_apps = []

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "resume_refining",
# 		"logo": "/assets/resume_refining/logo.png",
# 		"title": "Resume Refining",
# 		"route": "/resume_refining",
# 		"has_permission": "resume_refining.api.permission.has_app_permission"
# 	}
# ]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/resume_refining/css/resume_refining.css"
# app_include_js = "/assets/resume_refining/js/resume_refining.js"

# include js, css files in header of web template
# web_include_css = "/assets/resume_refining/css/resume_refining.css"
# web_include_js = "/assets/resume_refining/js/resume_refining.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "resume_refining/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "resume_refining/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# automatically load and sync documents of this doctype from downstream apps
# importable_doctypes = [doctype_1]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "resume_refining.utils.jinja_methods",
# 	"filters": "resume_refining.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "resume_refining.install.before_install"
# after_install = "resume_refining.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "resume_refining.uninstall.before_uninstall"
# after_uninstall = "resume_refining.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "resume_refining.utils.before_app_install"
# after_app_install = "resume_refining.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "resume_refining.utils.before_app_uninstall"
# after_app_uninstall = "resume_refining.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "resume_refining.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"resume_refining.tasks.all"
# 	],
# 	"daily": [
# 		"resume_refining.tasks.daily"
# 	],
# 	"hourly": [
# 		"resume_refining.tasks.hourly"
# 	],
# 	"weekly": [
# 		"resume_refining.tasks.weekly"
# 	],
# 	"monthly": [
# 		"resume_refining.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "resume_refining.install.before_tests"

# Overriding Methods
# ------------------------------
#
override_whitelisted_methods = {
	"process_resumes": "resume_refining.api.process_resumes",
    "get_jd": "resume_refining.api.get_all_records",
    "get_applicants": "resume_refining.api.get_job_applicants"
}
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "resume_refining.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["resume_refining.utils.before_request"]
# after_request = ["resume_refining.utils.after_request"]

# Job Events
# ----------
# before_job = ["resume_refining.utils.before_job"]
# after_job = ["resume_refining.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"resume_refining.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }


website_route_rules = [{'from_route': '/resume-refining/<path:app_path>', 'to_route': 'resume-refining'}, {'from_route': '/resume-refining/<path:app_path>', 'to_route': 'resume-refining'},]