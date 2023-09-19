#!/bin/bash
export VAULT_ADDR=http://$(aws ec2 describe-instances --region {{ region }} --filters "Name=tag:Name,Values=vault-{{ env }}" --query 'Reservations[].Instances[].PrivateIpAddress' --output text):8200
export VAULT_TOKEN=$(aws secretsmanager get-secret-value --secret-id cicd-vault-{{ env }}-token --region {{ region }} --query 'SecretString' --output text | awk -F'"' '{print $4}')

/home/ubuntu/bin/vault kv get -format=json kv/consul/keygen