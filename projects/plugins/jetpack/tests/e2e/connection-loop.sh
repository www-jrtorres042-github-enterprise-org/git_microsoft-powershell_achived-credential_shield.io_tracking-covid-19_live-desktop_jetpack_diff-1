export HEADLESS=true
#export E2E_DEBUG=true
#export PAUSE_ON_FAILURE=true
export CI=true

for i in {1..1}; do
	echo "-------"
	echo "Run $i"

	pnpm tunnel-reset >/dev/null

	cat ./config/tmp/e2e-tunnels.txt

	if ! pnpm test-e2e -- --testNamePattern=classic >/dev/null;
	then
		cp -R ./output ./results/"$(date +%s)"
		break
	fi
done
