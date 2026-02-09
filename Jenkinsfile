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
      description: 'Suite to execute'
    )
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

    stage('Run Tests') {
      steps {
        script {
          if (params.TEST_SUITE == 'regression') {
            sh 'npx playwright test --grep @regression'
          } else {
            sh 'npx playwright test --grep @smoke'
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
