/* groovylint-disable NestedBlockDepth */
pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.58.0-jammy'
            args '-u root:root'
        }
    }

    triggers {
        cron('TZ=America/Bogota\n5 15 * * 1-5')
    }

    environment {
        CI = 'true'
    }

    parameters {
        string(
      name: 'TEST_SUITE',
      defaultValue: 'smoke',
      description: 'Suite to execute')
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Compile') {
            steps {
                sh 'npm run compile'
            }
        }

        stage('Cross Browser') {
            parallel {
                stage('Chromium') {
                    steps {
                        sh 'npx playwright test --project=chromium'
                    }
                }

                stage('Firefox') {
                    /* groovylint-disable-next-line NestedBlockDepth */
                    steps {
                        sh 'npx playwright test --project=firefox'
                    }
                }
            }
        }
    }

    post {
        always {
            publishHTML([
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright Report',
        keepAll: true,
        alwaysLinkToLastBuild: true,
        allowMissing: false
      ])
        }
    }
}
