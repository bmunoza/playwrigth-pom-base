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
        sh 'npx playwright test'
      }
    }
  }

  post {
    success {
      echo '✅ QA CI passed'
    }
    failure {
      echo '❌ QA CI failedfailed'
    }
  }
}
