pipeline {
  agent {
    docker {
      image 'node:18-bullseye'
      args '-u root:root'
    }
  }

  environment {
    CI = 'true'
  }

  parameters {
    choice(
      name: 'TEST_SUITE',
      choices: ['smoke', 'regression'],
      description: 'Suite de pruebas a ejecutar'
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

    stage('Install Playwright Browsers') {
      steps {
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Run Tests') {
      steps {
        script {
          if (params.TEST_SUITE == 'smoke') {
            sh 'npx playwright test --grep @smoke'
          } else {
            sh 'npx playwright test --grep @regression'
          }
        }
      }
    }
  }

  post {
    success {
      echo '✅ QA CI passed'
    }
    failure {
      echo '❌ QA CI failed'
    }
  }
}
