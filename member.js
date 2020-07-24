
/**********************Delete Group member starts here*************************************/

$(document).on('click','.Delete_Member',function()
{
	var Serial_No = $(this).attr('data_s_NO');
	var group_id= $(this).attr('group_id');
	$.ajax( {
		url:'user_function.php',
		method:"POST",
		data:{S_No:Serial_No, secureID:secureID,group_id:group_id},
		success: function(data)
		{
			alert(data);
			location.reload();
		},
		error: function(e)
		{
			alert(e);
		}
	});

});

/**************************Delete Group member ends here*********************************/




/********************Update Group member starts here*****************/

$(document).on('click','.edit-modal-view',function()
{
	var name=$(this).attr('naam');
	var DOB=$(this).attr('dob');
	var Mobile=$(this).attr('mobile');
	var altMobile=$(this).attr('altMob');

	var member_id=$(this).attr('member_id');

	alert(name);
	alert(DOB);
	alert(Mobile);
	alert(altMobile);
	alert(member_id);

	$('#name').val(name);

	
	$('#dob').val(DOB);
	
	$('#Mno').val(Mobile);
	$('#Alt_Mno').val(altMobile);
	$('#member_id').val(member_id);

	$('#UpdateModal').modal('show'); 



	
});

$(document).on('submit','.update_user',function(e)

{
	e.preventDefault();
	var formData= $('.update_user').serialize();
	alert(JSON.stringify(formData));
	

	$.ajax({
	 url: "user_function.php",
	 method: "POST",
	 data: formData,
	 success: function(data)
    {
       alert(data);
       location.reload();
	},
	error: function(e)
	{
	 alert(e);
	}});


});




// ******************************************Update  Group member ends Here*************************************

/***********************************************************************************************************************************/

//********************************************Add Member to Member Table starts Here**********************************************************
function name_check()
	{
		var user_name=$('#name').val().trim();
		if(user_name.length == ''){
			$('#namecheck').show();
			$('#namecheck').html("** Name Must Not be Empty!");
			$('#namecheck').focus();
			$('#namecheck').css("color","red");
			name_err=false;
			return false;

		}
		else
		{
			$('#namecheck').hide();
			var regx=/^[A-Z][a-z]{1,}[a-z\s]{0,}[^0-9]$/gi;
			if(regx.test(user_name)==false)
			{

				$('#namecheck').show();
				$('#namecheck').html("** Name should contain minimum 3 letters and should not contain any numeric value");
				$('#namecheck').focus();
				$('#namecheck').css("color","red");
				name_err=false;
				return false;
			}
			else
			{
				$('#namecheck').hide();
				return true;
			}
		}	
	}
$(document).on('submit','#save_user',function(e)
{
	e.preventDefault();

	var name_err=name_check();
	var dob_err=dob_check();
	var mno_err=Mobile_check();
	var altmno_err=AltMobile_check();

	$('#name').keyup(function(){

		
		name_check(name,name_check);

	});
	

	$('#mno').keyup(function(){
		
		Mobile_check();

	});

	function Mobile_check()
	{
		var Mobile=$('#mno').val();
		if(Mobile.length == '')
		{
			$('#mobcheck').show();
			$('#mobcheck').html("<span class='text-danger'>** Mobile Number Must Not be Empty!</span>");
			$('#mobcheck').focus();
			$('#mobcheck').css("color","red");
			mno_err=false;
			return false;
		}
		else
		{
			$('#mobcheck').hide();
			var mobRegx=/^[6-9][0-9]{8}[0-9]$/;
			if(mobRegx.test(Mobile)==false)
			{
			  $('#mobcheck').show();
			  $('#mobcheck').html("** Please Enter a Valid Mobile Number!");
			  $('#mobcheck').focus();
			  $('#mobcheck').css("color","red");
			  mno_err=false;
			  return false;
			}
			else
			{
				$('#mobcheck').hide();
				return true;
			}
		}
	}

	$('#altMno').keyup(function(){
		
		AltMobile_check();
	});

	function AltMobile_check()
	{
		var mobRegx=/^[6-9][0-9]{8}[0-9]$/;
		var Mobile=$('#altMno').val();
		if(Mobile.length == '')
		{
			$('#altmobcheck').hide();
			return true;
		}
		else
		{
			if(mobRegx.test(Mobile)==false)
			{
				$('#altmobcheck').show();
				$('#altmobcheck').html("** Please Enter a Valid Mobile Number!");
				$('#altmobcheck').focus();
				$('#altmobcheck').css("color","red");
				altmno_err=false;
				return false;
			}
			else
			{
				$('#altmobcheck').hide();
				return true;
			}
		}
		
	}

	$('#dob').keyup(function(){
		dob_check();
	});

	function dob_check()
	{
		var dob=$('#dob').val();
		if(dob.length == '')
		{
			$('#dobcheck').show();
			$('#dobcheck').html("** Date of Birth can't be empty!");
			$('#dobcheck').focus();
			$('#dobcheck').css("color","red");
			dob_err=false;
			return false;
		}
		else
		{
			$('#dobcheck').hide();
			return true;
		}
	}
	alert(altmno_err);
	if(name_err && dob_err && mno_err && altmno_err)
	{

		var formData = $('#save_user').serialize();
		alert(JSON.stringify(formData));

		$.ajax({
	 	 url: "user_function.php",
	  	 method: "POST",
	  	 data: formData,
	  	 success: function(data)
      	 {
			alert(data);
			location.reload();
	  	 },
	  	 error: function(e)
	  	 {
	  		alert(e);
	  	 }
		});
	}
});






 //****************************************************Add member to Membeb table ends here*************************************************

 //******************************************************************************************************************************************


 //**************************************create group js starts here********************************************************

 $(document).on('submit','#create_group',function(e)
{
	//alert("hello");
	e.preventDefault();

	var formData=$('#create_group').serialize();
	//alert(JSON.stringify(formData));


	$.ajax({
	   url: "user_function.php",
	   method: "POST",
	   data: formData,
	   success: function(data)
      {
		alert(data);
		location.reload();
	    },
	  error: function(e)
	  {
	  	alert(e);
	  }
	});





});


//*********************************************************create group js ends here********************************************************


//*************************************************************************************************************************************

//*****************************************delete members from member table starts here**********************************************


 $(document).on('submit','#delete_member',function(e)
{
	e.preventDefault();
    var atLeastOneIsChecked = false;
    $('input:checkbox').each(function () {
    if ($(this).is(':checked')) {
      atLeastOneIsChecked = true;

      // Stop .each from processing any more items
      return false;
    }
  	});
	

	if(atLeastOneIsChecked)
	{
		var formData=$('#delete_member').serialize();
		$.ajax({
	  	 url: "user_function.php",
	  	 method: "POST",
	   	 data: formData,
	   	 success: function(data)
      	 {
			alert(data);
			location.reload();
	     },
	     error: function(e)
	  	 {
	  		alert(e);
	  	 }
		});
	}
	else
	{
		alert("Please select at least one to delete!!!");
	}






});



//*******************************************delete members from member table ends here**********************************************


//****************************************************************************************************************************************************************


//**********************************************************msgContacts Js Starts Here**************************************************************************


 $(document).on('submit','#send_message',function(e)
{
	alert("hello");
	e.preventDefault();

	var formData=$('#send_message').serialize();
	alert(JSON.stringify(formData));
	alert("javascript");


	$.ajax({
	   url: "user_function.php",
	   method: "POST",
	   data: formData,
	   success: function(data)
      {
		alert(data);
		location.reload();
	    },
	  error: function(e)
	  {
	  	alert(e);
	  }
	});





});




//************************************************************msgContacts Js Ends Here*************************************************************************

//***********************************************************************************************************************************************************

//************************************Send Group Message Js Starts Here**************************************************************************************



 $(document).on('submit','#send_Groupmessage',function(e)
{
	alert("hello");
	e.preventDefault();

	var formData=$('#send_Groupmessage').serialize();
	alert(JSON.stringify(formData));
	alert("javascript");


	$.ajax({
	   url: "user_function.php",
	   method: "POST",
	   data: formData,
	   success: function(data)
      {
		alert(data);
		location.reload();
	    },
	  error: function(e)
	  {
	  	alert(e);
	  }
	});





});


//*****************************************************************************************************************************************************

//**************************************************************Message Record JS starts Here**********************************************************

$(document).on('click','#view_msg',function()
{
  var msg=$(this).attr('msg');
  $('#msgarea').val(msg);
  $('#view_msg_modal').modal('show');
});

$(document).on('click','#Sent_TO',function()
{
	// alert("button clicked");
	var id=$(this).attr('meber_id');
	// alert(id);
	$.ajax({
		url:"user_function.php",
		method:"POST",
		data:{id:id},
		
		success: function(data)
		{
			$('#fullWala').addClass('col-md-6');
			 $('#halfWala').addClass('col-md-6');
          $('#fullwala').removeClass('col-md-12');
          
          $('#halfWala').html(data);
         // alert(data);


		}

	});

});












//**********************************************************Message Record JS Ends Here********************************************************************



/*********************************************************************************************************************************************************/

/************************************************************************add multiple member**************************************************************/

$(document).on('click','#numbersubmit',function()
{
	
	var no_of_user = $('#number').val();
	alert(no_of_user);
	$.ajax({
		url:"user_function.php",
		method:"POST",
		data:{no_of_user:no_of_user,check:'no_of_user'},
		success: function(data)
		{
			alert(data);
			
			$('#upperwala').html(data);
			
		}
	});
});


/*****************************************Delete Group**********************************/

$(document).on('click','#delete_group',function()
{
	var group_id=$(this).attr('group_id');
	$.ajax({
		url:'user_function.php',
		method:'POST',
		data:{Delete_group_id:group_id,secureID:secureID},
		success: function(data)
		{
			alert(data);
			location.reload();
		},
		error: function(e)
		{
			alert(e);
		}

	});
});



