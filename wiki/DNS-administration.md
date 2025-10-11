# DNS administration för pownas.se

För att få sidan att fungera via GitHub-pages, så krävs vissa inställningar. 

Läs mer via sidorna:  
* https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site  
* https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https#verifying-the-dns-configuration 
* https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages#notservedbypageserror  


## Felsökning av domänen
Förslag från Copilot:  

The NotServedByPagesError in GitHub Pages means your custom domain is configured in your repository, but your DNS settings do not point to GitHub’s servers, or there is a DNS misconfiguration.

### How to Fix NotServedByPagesError
1. Check your DNS records  
For the apex domain (domain.com), add these four A records:  
```
domain.com.    IN    A    185.199.108.153
domain.com.    IN    A    185.199.109.153
domain.com.    IN    A    185.199.110.153
domain.com.    IN    A    185.199.111.153
```
For www subdomain (www.domain.com), add a CNAME record:  
```
www    IN    CNAME    yourusername.github.io.
```
Replace yourusername with your actual GitHub username or organization name.  

2. Remove conflicting records  
Do NOT have a CNAME record on the apex domain (domain.com). Use only A records for it.  
If you previously hosted elsewhere, remove any old A, CNAME, or URL forwarding records for domain.com and www.domain.com.  

3. Verify GitHub Pages settings  
In your repo’s Settings → Pages, ensure your custom domain is set correctly (i.e., domain.com or www.domain.com as needed).  
Make sure “Enforce HTTPS” is checked.

4. Wait for DNS propagation  
Changes can take up to 24 hours to fully propagate.  

5. Verify with DNS tools  
Use whatsmydns.net to check your A and CNAME records globally.  

Summary:

Apex domain (`domain.com`): 4 A records as above.  
Subdomain (`www.domain.com`): 1 CNAME record.  
Remove any conflicting/old records.  
Set the custom domain in GitHub Pages settings.  
Wait for propagation.  
