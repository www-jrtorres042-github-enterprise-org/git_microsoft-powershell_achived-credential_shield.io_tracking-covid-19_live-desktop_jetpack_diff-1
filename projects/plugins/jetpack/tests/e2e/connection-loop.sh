export HEADLESS=true
#export E2E_DEBUG=true
#export PAUSE_ON_FAILURE=true
export CI=true

for i in {1..1}; do
	echo "-------"
	echo "Run $i"

	pnpm env-reset >/dev/null
	pnpm tunnel-reset >/dev/null

	cat ./config/tmp/e2e-tunnels.txt

	if ! pnpm test-e2e -- --testNamePattern=classic >/dev/null;
	then
		cp -R ./output ./results/failed/"$(date +%s)"
		break
	else
		cp -R ./output ./results/passed/"$(date +%s)"
	fi
done
