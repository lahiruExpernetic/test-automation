const fs = require('fs');

class MyJsonReporter {
  constructor() {
    this.report = {
      startTime: new Date().toISOString(),
      totalTests: 0,
      tests: [],
    };
  }

  onBegin(config, suite) {
    this.report.totalTests = suite.allTests().length;
  }

  onTestBegin(test) {
    this.report.tests.push({
      title: test.title,
      startTime: new Date().toISOString(),
      TestCaseId: "",
      TestRunId: ""
    });
  }

  onTestEnd(test, result) {
    const currentTest = this.report.tests.find(t => t.title === test.title);
    if (!currentTest) return;

    currentTest.endTime = new Date().toISOString();
    currentTest.result = result.status;

    test.annotations.map(annotation => {
      if (annotation.description) {
        (annotation.type === "TestCaseId") ? currentTest.TestCaseId = annotation.description : currentTest.TestRunId = annotation.description;
      }
    })
  }

  onEnd(result) {
    this.report.endTime = new Date().toISOString();
    this.report.status = result.status;

    const currentDate = new Date();
    const filename = `reports/report-${currentDate.toISOString().replace(/:/g, "-").replace(/\..+/, "")}.json`;
    fs.writeFileSync(filename, JSON.stringify(this.report, null, 2));
  }
}

module.exports = MyJsonReporter;
