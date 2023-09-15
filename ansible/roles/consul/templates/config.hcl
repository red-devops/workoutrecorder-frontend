# Main
server = false
datacenter = "{{ env }}-{{ region }}"
domain = "consul"
node_name = "{{ app }}-{{ private_ip_address }}"
rejoin_after_leave = true
leave_on_terminate = true

# Logging
log_level = "INFO"
enable_syslog = true  #jak bedzie dzialac zmienic na false

# Data persistence
data_dir = "{{ app_data }}"

# Networkig
client_addr = "127.0.0.1"
bind_addr = "{{ private_ip_address }}"

# Join other Consul agents
retry_join = [ "provider=aws tag_key=function tag_value=consul-server region={{ region }}" ]

# Ports
ports {
  grpc      = 8502
  http      = 8500
  dns       = 8600
}

## ACL configuration
acl = {
  enabled = true
  default_policy = "deny"
  enable_token_persistence = true
  tokens {
    agent  = "{{ service_token }}"
    default  = "{{ service_token }}"
  }
}

service {
  name = "{{ app }}"
  id = "{{ app }}-{{ private_ip_address }}"
  tags = [
    "urlprefix-/"
    ]
  port = {{ app_port }}
  address = "{{ private_ip_address }}"
  token = "{{ service_token }}"

  check
  {
    id       = "{{ app }}",
    name     = "{{ app }} status check",
    service_id = "{{ app }}-{{ private_ip_address }}",
    tcp     = "localhost:{{ app_port }}",
    interval = "15s",
    timeout = "5s"
  }
}

# Gossip encryption
encrypt = "{{ keygen }}"
