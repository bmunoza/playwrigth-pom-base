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

    stage('Install Playwright Browsers') {
      steps {
        sh 'npx playwright install --with-deps'
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
    success {
      echo '✅ QA CI passed'
    }
    failure {
      echo '❌ QA CI failed'
    }
  }
}
