echo "🔍 Checking if all services are running..."
    
    services=$(docker stack services prod --format '{{.Name}} {{.Replicas}}')
    
    failed=0

    echo "$services" | while read name replicas; do
      desired=$(echo "$replicas" | cut -d/ -f2)
      running=$(echo "$replicas" | cut -d/ -f1)

      echo "🔧 Service: $name | Running: $running | Desired: $desired"

      if [ "$running" != "$desired" ]; then
        echo "❌ Service $name is not fully running ($running/$desired)"
        failed=1
      fi
    done

    if [ "$failed" -eq 1 ]; then
      echo "❌ One or more services failed to reach desired state."
      exit 1
    else
      echo "✅ All services are running."
    fi