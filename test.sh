#tcs
web-test-runner --coverage
coverageValue=`grep -oE -m 1 '\s*([0-9\.]+\%)' coverage/lcov-report/index.html`

sed "s/100.0%/${coverageValue}/" test/coverage.svg >coverage/coverage.svg
