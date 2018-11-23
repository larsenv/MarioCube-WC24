@echo on


@echo ************************************
@echo * ïœêîÇÃê›íË
@echo ************************************
SET PATH=%REVOLUTION_SDK_ROOT%\X86\bin;d:\cygwin\bin;%PATH%
SET LYTCVTR=%NW4R_ROOT%\CommandLineTools\bin\nw4r_lytcvtr.exe
SET ENCODE2=%REVO_VOTE_ROOT%\rawdata\ENCODE2

cd %REVO_VOTE_ROOT%/rawdata/Channel/html/US/html/

cd ../
darchD -c html html_US.arc

mv html_US.arc ../../../../dvddata/content9

pause
