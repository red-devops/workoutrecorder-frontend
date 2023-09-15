#!/bin/bash
export CONSUL_HTTP_ADDR=http://$(aws ec2 describe-instances --region {{ region }} --filters "Name=tag:Name,Values=consul-{{ env }}" --query 'Reservations[].Instances[].PrivateIpAddress' --output text | awk '{print $1}'):8500
export CONSUL_HTTP_TOKEN=$(aws secretsmanager get-secret-value --secret-id {{ consul_bootstrap_secret_name }} --region {{ region }} | jq -r '.["SecretString"] | fromjson | ."acl-bootsrap-token"')

/home/ubuntu/bin/consul acl token list -format=json | jq -r '.[] | select(.Policies[].Name == "{{ app }}") | .SecretID'
