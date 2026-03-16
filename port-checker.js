(function() {
    var hostEl = document.getElementById('portHost');
    var portEl = document.getElementById('portNumber');
    var btnEl = document.getElementById('portCheck');
    var resultsEl = document.getElementById('portResults');
    var loadingEl = document.getElementById('portLoading');
    var dataEl = document.getElementById('portData');

    var portNames = {
        21:'FTP',22:'SSH',23:'Telnet',25:'SMTP',53:'DNS',80:'HTTP',110:'POP3',
        143:'IMAP',443:'HTTPS',465:'SMTPS',587:'Submission',993:'IMAPS',995:'POP3S',
        3306:'MySQL',3389:'RDP',5432:'PostgreSQL',8080:'HTTP Alt',8443:'HTTPS Alt'
    };

    var presetBtns = document.querySelectorAll('[data-ports]');
    for (var i = 0; i < presetBtns.length; i++) {
        presetBtns[i].addEventListener('click', function() {
            portEl.value = this.getAttribute('data-ports');
        });
    }

    function check() {
        var host = hostEl.value.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
        var ports = portEl.value.trim();
        if (!host || !ports) return;
        resultsEl.style.display = 'block';
        loadingEl.style.display = 'block';
        dataEl.innerHTML = '';
        btnEl.disabled = true;

        fetch('https://api.file-converter-free.com/api/port-check?host=' + encodeURIComponent(host) + '&ports=' + encodeURIComponent(ports))
            .then(function(r) { return r.json(); })
            .then(function(data) {
                loadingEl.style.display = 'none';
                btnEl.disabled = false;
                if (data.error) { dataEl.innerHTML = '<div class="nettool-error">' + data.error + '</div>'; return; }
                var html = '<div class="nettool-port-grid">';
                var results = data.results || data.ports || [];
                for (var j = 0; j < results.length; j++) {
                    var p = results[j];
                    var open = p.open || p.status === 'open';
                    var portNum = p.port;
                    var name = portNames[portNum] || '';
                    html += '<div class="nettool-port-item ' + (open ? 'nettool-port-open' : 'nettool-port-closed') + '">';
                    html += '<span class="nettool-dot ' + (open ? 'nettool-dot-green' : 'nettool-dot-red') + '"></span>';
                    html += '<span>' + portNum + (name ? ' (' + name + ')' : '') + '</span>';
                    html += '</div>';
                }
                html += '</div>';
                dataEl.innerHTML = html || '<div class="nettool-error">No results.</div>';
            })
            .catch(function() {
                loadingEl.style.display = 'none';
                btnEl.disabled = false;
                dataEl.innerHTML = '<div class="nettool-error">Failed to check ports. Please try again.</div>';
            });
    }

    btnEl.addEventListener('click', check);
    hostEl.addEventListener('keydown', function(e) { if (e.key === 'Enter') check(); });
    portEl.addEventListener('keydown', function(e) { if (e.key === 'Enter') check(); });
})();
