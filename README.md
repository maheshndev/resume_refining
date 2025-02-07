### Resume Refining

to filter resume with skills & experiance

![image](https://github.com/user-attachments/assets/844f4d51-55b2-4091-a7cb-3aadc57682d9)

<img width="1440" alt="Screenshot 2025-02-07 at 5 17 28 PM" src="https://github.com/user-attachments/assets/1581ef72-f6cb-4a2a-9571-17734d7d4c8f" />
<img width="629" alt="Screenshot 2025-02-07 at 5 20 29 PM" src="https://github.com/user-attachments/assets/56d7c27a-56ef-48b9-9992-c0eb4d066510" />


### Installation

You can install this app using the [bench](https://github.com/frappe/bench) CLI:


```bash
cd $PATH_TO_YOUR_BENCH
bench get-app $URL_OF_THIS_REPO --branch develop
bench install-app resume_refining
```

### Contributing

This app uses `pre-commit` for code formatting and linting. Please [install pre-commit](https://pre-commit.com/#installation) and enable it for this repository:

```bash
cd apps/resume_refining
pre-commit install
```

Pre-commit is configured to use the following tools for checking and formatting your code:

- ruff
- eslint
- prettier
- pyupgrade
### CI

This app can use GitHub Actions for CI. The following workflows are configured:

- CI: Installs this app and runs unit tests on every push to `develop` branch.
- Linters: Runs [Frappe Semgrep Rules](https://github.com/frappe/semgrep-rules) and [pip-audit](https://pypi.org/project/pip-audit/) on every pull request.


### License

mit
