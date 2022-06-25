git add -A

if [ $# -eq 0 ]
then
	echo "És obligatori introduir el comentari"
	echo './git.sh "Comentari modificació"'
	exit 1
fi

if [ $# -gt 1 ]
then
	echo "Només és permès un comentari"
	echo './git.sh "Comentari modificació"'
	exit 1
fi


git commit -m "$1"
git push origin main
