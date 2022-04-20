pipeline {
    agent any

    environment {
        K6_API_TOKEN=credentials("K6_API_TOKEN")
        K6_CLOUD_PROJECT_ID=credentials("K6_CLOUD_PROJECT_ID")
    }
    stages {
        stage('Performance Testing') {
            steps {
                sh "pwd"
                echo 'Running K6 performance tests...'
                sh 'sudo chmod +x setup_k6.sh'
                sh 'sudo ./setup_k6.sh'
                //sh 'k6 login cloud --token ${K6_API_TOKEN}'
                // sh 'k6 run --out json=result.json main_test.js'
                sh 'k6 run main_test.js | k6-to-junit junit.xml'          
                echo 'Completed Running K6 performance tests!'
            }
        }
    }
    post {
        always {
            perfReport filterRegex: '', sourceDataFiles: 'junit.xml'
    }
  }
}
